export const tableStyle = (style) => {
  console.log(
    '🚀 ~ file: tableStyleClass.js ~ line 2 ~ tableStyle ~ style',
    style
  );
  const identifiers = Object.keys(style);
  const styleToApply = identifiers.find(function (id) {
    return style[id] === 'TRUE';
  });

  if (styleToApply) {
    return styleClassMapping[styleToApply];
  }

  return '';
};

const styleClassMapping = {
  is_link: 'row_link',
  is_block: 'row_block',
  is_dropdown: 'row_dropdown',
  is_elasticity_confidence: 'row_elasticity_confidence',
};
