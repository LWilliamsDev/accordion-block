//adds the accordionLink attribute to core blocks 
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }


function addAttributes(settings, name) {
  if (typeof settings.attributes !== 'undefined') {
     if (name == 'core/paragraph' || name == 'core/button' || name == 'core/heading') {
      settings.attributes = Object.assign(settings.attributes, {
        accordionLink: { //adds accordionLink attribute to paragraph, button, and heading blocks
          type: 'boolean',
          default: false
        }
      });
    }
  }

  return settings;
}

wp.hooks.addFilter('blocks.registerBlockType', 'accordion', addAttributes);


const addInspectorControls = wp.compose.createHigherOrderComponent(BlockEdit => {
  return props => {
if (props.name == 'core/paragraph' || props.name == 'core/button' || props.name == 'core/heading') { //adds toggle control for accordionLink attribute; does not print accordionLink class in Gutenberg editor. There is no point in doing so, because it is not something that can be previewed or tested in the editor.
  const {
    Fragment
  } = wp.element;
  const {
    PanelBody,
    ToggleControl
  } = wp.components;
  const {
    InspectorControls
  } = wp.blockEditor;
  const {
    attributes,
    setAttributes,
  //      isSelected
  } = props;
  const {
    accordionLink
  } = attributes;


  return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(BlockEdit, props), /*#__PURE__*/React.createElement(InspectorControls, null,  /*#__PURE__*/ React.createElement(PanelBody, null, React.createElement(ToggleControl, {
    label: wp.i18n.__('Has links to accordion panels', 'accordion'),
    checked: accordionLink,
    onChange: accordionLink => setAttributes({
      accordionLink
    })
  }),
)));
}
else  {
  return React.createElement(BlockEdit, props);
}
  };
}, 'addInspectorControls');
wp.hooks.addFilter('editor.BlockEdit', 'accordion', addInspectorControls);

function applyExtraClass(extraProps, blockType, attributes) {
	const { accordionLink } = attributes;

	if (typeof accordionLink  !== 'undefined' && accordionLink ) {
    if (extraProps.className) { //this conditional prevents it from printing a class name "undefined" if the additional CSS field has no classes in it
      extraProps.className = extraProps.className + ' accordion__open-link';
    }
    else {
        extraProps.className = 'accordion__open-link';
    }
	}
	return extraProps;
}

wp.hooks.addFilter(
	'blocks.getSaveContent.extraProps',
	'accordion',
	applyExtraClass
);
