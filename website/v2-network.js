(() => {
  const RELATION_TYPES = new Set(['system', 'growth', 'combination', 'contrast']);
  const QUICK_FIELDS = ['origin', 'example', 'memoryHook'];
  const DEEP_FIELDS = ['logic', 'scenes', 'structures', 'chineseTrap', 'studyTip'];

  function isPlainObject(value) {
    return value !== null && typeof value === 'object' && Object.prototype.toString.call(value) === '[object Object]';
  }

  function isNonEmptyString(value) {
    return typeof value === 'string' && value.trim().length > 0;
  }

  function display(value) {
    try { return String(value); } catch { return '<unprintable>'; }
  }

  function cloneNode(node) {
    if (!isPlainObject(node)) return null;
    return {
      ...node,
      quick: isPlainObject(node.quick) ? { ...node.quick } : node.quick,
      deep: isPlainObject(node.deep) ? { ...node.deep } : node.deep,
      relations: Array.isArray(node.relations) ? node.relations.map(relation => isPlainObject(relation) ? { ...relation } : relation) : node.relations,
    };
  }

  function nodeById(data, id) {
    if (!isPlainObject(data) || !Array.isArray(data.nodes) || !isNonEmptyString(id)) return null;
    const node = data.nodes.find(item => isPlainObject(item) && item.id === id);
    return cloneNode(node);
  }

  function nodesForSystem(data, systemId) {
    if (!isPlainObject(data) || !Array.isArray(data.nodes) || !isNonEmptyString(systemId)) return [];
    return data.nodes.filter(node => isPlainObject(node) && node.systemId === systemId).map(cloneNode);
  }

  function isCompleteRelation(relation) {
    return isPlainObject(relation)
      && RELATION_TYPES.has(relation.type)
      && isNonEmptyString(relation.target)
      && isNonEmptyString(relation.label)
      && isNonEmptyString(relation.explanation);
  }

  function explorableRelations(data, node) {
    const source = typeof node === 'string' ? nodeById(data, node) : cloneNode(node);
    if (!source || !Array.isArray(source.relations) || !isPlainObject(data)) return [];
    const systemIds = new Set(Array.isArray(data.systems) ? data.systems.filter(isPlainObject).map(system => system.id) : []);
    return source.relations.reduce((result, relation) => {
      if (!isCompleteRelation(relation)) return result;
      const targetNode = relation.type === 'system' ? null : nodeById(data, relation.target);
      const targetSystem = relation.type === 'system' && systemIds.has(relation.target)
        ? { ...data.systems.find(system => isPlainObject(system) && system.id === relation.target) }
        : null;
      if (!targetNode && !targetSystem) return result;
      result.push({ ...relation, targetNode, targetSystem });
      return result;
    }, []);
  }

  function pushExplorePath(path, id) {
    return Array.isArray(path) && isNonEmptyString(id) ? [...path, id] : [];
  }

  function popExplorePath(path) {
    return Array.isArray(path) ? path.slice(0, -1) : [];
  }

  function validateGraph(data) {
    const errors = [];
    if (!isPlainObject(data)) return { errors: ['data must be a plain object'] };
    if (!Array.isArray(data.systems)) errors.push('systems must be an array');
    if (!Array.isArray(data.nodes)) errors.push('nodes must be an array');
    if (!Array.isArray(data.systems) || !Array.isArray(data.nodes)) return { errors };

    const systemIds = new Set();
    data.systems.forEach((system, index) => {
      const label = `system[${index}]`;
      if (!isPlainObject(system)) {
        errors.push(`${label} must be a plain object`);
        return;
      }
      ['id', 'title'].forEach(field => {
        if (!isNonEmptyString(system[field])) errors.push(`${label} is missing valid ${field}`);
      });
      if (isNonEmptyString(system.id)) {
        if (systemIds.has(system.id)) errors.push(`duplicate system id: ${system.id}`);
        systemIds.add(system.id);
      }
    });

    const nodeIds = new Set();
    data.nodes.forEach((node, index) => {
      const label = `node[${index}]`;
      if (!isPlainObject(node)) {
        errors.push(`${label} must be a plain object`);
        return;
      }
      ['id', 'word', 'systemId', 'coreMeaning', 'coreImage'].forEach(field => {
        if (!isNonEmptyString(node[field])) errors.push(`${label} is missing valid ${field}`);
      });
      if (isNonEmptyString(node.id)) {
        if (nodeIds.has(node.id)) errors.push(`duplicate node id: ${node.id}`);
        nodeIds.add(node.id);
      }
      if (isNonEmptyString(node.systemId) && !systemIds.has(node.systemId)) errors.push(`${label} has unknown system: ${node.systemId}`);
      [['quick', QUICK_FIELDS], ['deep', DEEP_FIELDS]].forEach(([group, fields]) => {
        if (!isPlainObject(node[group])) {
          errors.push(`${label} ${group} must be a plain object`);
          return;
        }
        fields.forEach(field => {
          const value = node[group][field];
          if (!(isNonEmptyString(value) || (Array.isArray(value) && value.length > 0))) errors.push(`${label} is missing valid ${group}.${field}`);
        });
      });
      if (!Array.isArray(node.relations)) errors.push(`${label} relations must be an array`);
    });

    data.nodes.forEach((node, nodeIndex) => {
      if (!isPlainObject(node) || !Array.isArray(node.relations)) return;
      node.relations.forEach((relation, relationIndex) => {
        const label = `node[${nodeIndex}] relation[${relationIndex}]`;
        if (!isPlainObject(relation)) {
          errors.push(`${label} must be a plain object`);
          return;
        }
        if (!RELATION_TYPES.has(relation.type)) errors.push(`${label} has invalid type: ${display(relation.type)}`);
        ['target', 'label', 'explanation'].forEach(field => {
          if (!isNonEmptyString(relation[field])) errors.push(`${label} is missing valid ${field}`);
        });
        if (!isNonEmptyString(relation.target)) return;
        if (relation.type === 'system') {
          if (!systemIds.has(relation.target)) errors.push(`${label} has unknown system target: ${relation.target}`);
        } else if (RELATION_TYPES.has(relation.type) && !nodeIds.has(relation.target)) {
          errors.push(`${label} has unknown node target: ${relation.target}`);
        }
      });
    });

    return { errors };
  }

  const api = { validateGraph, nodeById, nodesForSystem, explorableRelations, pushExplorePath, popExplorePath };
  globalThis.ENGLISH850_V2_NETWORK = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})();
