import { create } from 'zustand';
import { v4 as uuid } from 'uuid';
import { getTemplateById, CANVAS_WIDTH, CANVAS_HEIGHT } from '../data/templates';

const HISTORY_LIMIT = 60;
const STORAGE_PREFIX = 'invitecraft:invitation:';

function snapshot(state) {
  return {
    name: state.name,
    background: JSON.parse(JSON.stringify(state.background)),
    elements: JSON.parse(JSON.stringify(state.elements)),
  };
}

function saveToStorage(templateId, state) {
  try {
    localStorage.setItem(
      STORAGE_PREFIX + templateId,
      JSON.stringify({ name: state.name, background: state.background, elements: state.elements })
    );
  } catch {
    /* ignore quota errors */
  }
}

export function loadFromStorage(templateId) {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + templateId);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export const useEditorStore = create((set, get) => ({
  templateId: null,
  name: 'Untitled Invitation',
  background: { type: 'solid', color: '#FFFFFF' },
  elements: [],
  selectedId: null,
  past: [],
  future: [],

  loadInvitation(templateId) {
    const template = getTemplateById(templateId);
    if (!template) return;
    const saved = loadFromStorage(templateId);
    set({
      templateId,
      name: saved?.name || template.name,
      background: saved?.background || template.background,
      elements: saved?.elements || template.elements,
      selectedId: null,
      past: [],
      future: [],
    });
  },

  resetToTemplate(templateId) {
    const template = getTemplateById(templateId);
    if (!template) return;
    set({
      templateId,
      name: template.name,
      background: template.background,
      elements: template.elements,
      selectedId: null,
      past: [],
      future: [],
    });
    saveToStorage(templateId, get());
  },

  switchTemplate(templateId) {
    const template = getTemplateById(templateId);
    if (!template) return;
    get().beginChange();
    set({ templateId, background: template.background, elements: template.elements, selectedId: null });
    saveToStorage(templateId, get());
  },

  persist() {
    const state = get();
    if (state.templateId) saveToStorage(state.templateId, state);
  },

  beginChange() {
    set((state) => ({
      past: [...state.past.slice(-HISTORY_LIMIT + 1), snapshot(state)],
      future: [],
    }));
  },

  undo() {
    const { past, future } = get();
    if (past.length === 0) return;
    const previous = past[past.length - 1];
    set((state) => ({
      past: past.slice(0, -1),
      future: [snapshot(state), ...future].slice(0, HISTORY_LIMIT),
      name: previous.name,
      background: previous.background,
      elements: previous.elements,
      selectedId: null,
    }));
    get().persist();
  },

  redo() {
    const { future, past } = get();
    if (future.length === 0) return;
    const next = future[0];
    set((state) => ({
      future: future.slice(1),
      past: [...past, snapshot(state)].slice(-HISTORY_LIMIT),
      name: next.name,
      background: next.background,
      elements: next.elements,
      selectedId: null,
    }));
    get().persist();
  },

  setName(name) {
    set({ name });
    get().persist();
  },

  setBackground(background) {
    get().beginChange();
    set({ background });
    get().persist();
  },

  selectElement(id) {
    set({ selectedId: id });
  },

  addElement(partial) {
    get().beginChange();
    const newEl = {
      id: uuid(),
      rotation: 0,
      opacity: 1,
      x: CANVAS_WIDTH / 2 - 80,
      y: CANVAS_HEIGHT / 2 - 30,
      width: 160,
      height: 60,
      ...partial,
    };
    set((state) => ({ elements: [...state.elements, newEl], selectedId: newEl.id }));
    get().persist();
    return newEl.id;
  },

  updateElement(id, patch, { commit = true } = {}) {
    if (commit) get().beginChange();
    set((state) => ({
      elements: state.elements.map((e) => (e.id === id ? { ...e, ...patch } : e)),
    }));
    get().persist();
  },

  updateElementLive(id, patch) {
    set((state) => ({
      elements: state.elements.map((e) => (e.id === id ? { ...e, ...patch } : e)),
    }));
  },

  deleteElement(id) {
    get().beginChange();
    set((state) => ({
      elements: state.elements.filter((e) => e.id !== id),
      selectedId: state.selectedId === id ? null : state.selectedId,
    }));
    get().persist();
  },

  duplicateElement(id) {
    get().beginChange();
    const el = get().elements.find((e) => e.id === id);
    if (!el) return;
    const copy = { ...el, id: uuid(), x: el.x + 16, y: el.y + 16 };
    set((state) => ({ elements: [...state.elements, copy], selectedId: copy.id }));
    get().persist();
  },

  reorderElement(id, direction) {
    get().beginChange();
    set((state) => {
      const idx = state.elements.findIndex((e) => e.id === id);
      if (idx === -1) return state;
      const arr = [...state.elements];
      const [item] = arr.splice(idx, 1);
      if (direction === 'front') arr.push(item);
      else if (direction === 'back') arr.unshift(item);
      else if (direction === 'forward') arr.splice(Math.min(idx + 1, arr.length), 0, item);
      else if (direction === 'backward') arr.splice(Math.max(idx - 1, 0), 0, item);
      return { elements: arr };
    });
    get().persist();
  },
}));
