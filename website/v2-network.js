const REQUIRED_NODE_FIELDS = ['id', 'word', 'systemId', 'coreMeaning', 'coreImage', 'quick', 'deep', 'relations'];
const REQUIRED_QUICK_FIELDS = ['origin', 'example', 'memoryHook'];
const REQUIRED_DEEP_FIELDS = ['logic', 'scenes', 'structures', 'chineseTrap', 'studyTip'];
const RELATION_TYPES = new Set(['system', 'growth', 'combination', 'contrast']);

function hasContent(value) {
  return typeof value === 'string' ? value.trim().length > 0 : Array.isArray(value) ? value.length > 0 : Boolean(value);
}

function nodeById(data, id) {
  return (data && Array.isArray(data.nodes) ? data.nodes : []).find(node => node && node.id === id) || null;
}

function nodesForSystem(data, systemId) {
  return (data && Array.isArray(data.nodes) ? data.nodes : []).filter(node => node && node.systemId === systemId);
}

function explorableRelations(data, node) {
  const source = typeof node === 'string' ? nodeById(data, node) : node;
  if (!source || !Array.isArray(source.relations)) return [];
  const systems = data && Array.isArray(data.systems) ? data.systems : [];
  return source.relations.map(relation => ({
    ...relation,
    targetNode: nodeById(data, relation.target),
    targetSystem: systems.find(system => system && system.id === relation.target) || null,
  }));
}

function pushExplorePath(path, id) {
  return [...(Array.isArray(path) ? path : []), id];
}

function popExplorePath(path) {
  return Array.isArray(path) ? path.slice(0, -1) : [];
}

function validateGraph(data) {
  const errors = [];
  const nodes = data && Array.isArray(data.nodes) ? data.nodes : null;
  const systems = data && Array.isArray(data.systems) ? data.systems : null;
  if (!nodes) errors.push('nodes must be an array');
  if (!systems) errors.push('systems must be an array');
  if (!nodes || !systems) return { errors };

  const systemIds = new Set();
  systems.forEach((system, index) => {
    if (!system || !hasContent(system.id)) {
      errors.push(`system[${index}] is missing id`);
      return;
    }
    if (systemIds.has(system.id)) errors.push(`duplicate system id: ${system.id}`);
    systemIds.add(system.id);
  });

  const nodeIds = new Set();
  nodes.forEach((node, index) => {
    if (!node || typeof node !== 'object') {
      errors.push(`node[${index}] must be an object`);
      return;
    }
    REQUIRED_NODE_FIELDS.forEach(field => {
      if (!hasContent(node[field])) errors.push(`node[${index}] is missing ${field}`);
    });
    if (hasContent(node.id)) {
      if (nodeIds.has(node.id)) errors.push(`duplicate node id: ${node.id}`);
      nodeIds.add(node.id);
    }
    if (hasContent(node.systemId) && !systemIds.has(node.systemId)) errors.push(`node ${node.id || index} has unknown system: ${node.systemId}`);
    REQUIRED_QUICK_FIELDS.forEach(field => {
      if (!node.quick || !hasContent(node.quick[field])) errors.push(`node ${node.id || index} is missing quick.${field}`);
    });
    REQUIRED_DEEP_FIELDS.forEach(field => {
      if (!node.deep || !hasContent(node.deep[field])) errors.push(`node ${node.id || index} is missing deep.${field}`);
    });
  });

  const relationTargets = new Set([...nodeIds, ...systemIds]);
  nodes.forEach((node, index) => {
    if (!node || !Array.isArray(node.relations)) return;
    node.relations.forEach((relation, relationIndex) => {
      const label = `node ${node.id || index} relation[${relationIndex}]`;
      if (!relation || typeof relation !== 'object') {
        errors.push(`${label} must be an object`);
        return;
      }
      if (!RELATION_TYPES.has(relation.type)) errors.push(`${label} has invalid type: ${relation.type}`);
      if (!hasContent(relation.target) || !relationTargets.has(relation.target)) errors.push(`${label} has unknown target: ${relation.target}`);
      if (!hasContent(relation.explanation)) errors.push(`${label} is missing explanation`);
    });
  });

  return { errors };
}

module.exports = { validateGraph, nodeById, nodesForSystem, explorableRelations, pushExplorePath, popExplorePath };
