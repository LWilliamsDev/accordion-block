/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import { Disabled, SelectControl, TextControl, Panel, PanelBody, PanelRow } from '@wordpress/components';


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({attributes, setAttributes, clientId}) {
  const {
    myAnchor, className, target, content, level
   } = attributes;

  const blockProps = useBlockProps();

  if (!myAnchor) {
    setAttributes({myAnchor: 'heading__'+clientId})
  }


	return (
    <div { ...blockProps }>
     <InspectorControls key="setting">
       <PanelBody title={__('Accordion Header Settings', 'accordion')}>
         <Disabled><TextControl
          label={__('Target (ID of panel that this header opens)', 'accordion')}
          help={__('This value is set by the accordion content Anchor setting', 'accordion')}
          value={ target }
          /></Disabled>
          <SelectControl label={__('Heading Level', 'accordion')}
           value={level}
           options={[
             {value: "2", label: __('H2', 'bootstrap-blocks')},
             {value: "3", label: __('H3', 'bootstrap-blocks')},
             {value: "4", label: __('H4', 'bootstrap-blocks')},
             {value: "5", label: __('H5', 'bootstrap-blocks')},
             {value: "6", label: __('H6', 'bootstrap-blocks')},
           ]}
           onChange ={level => setAttributes({level})}
           />

       </PanelBody>

       <PanelBody title={__('Anchor', 'accordion')}>
         <TextControl
          label={__('Enter anchor', 'accordion')}
          value={ myAnchor }
          onChange={  myAnchor  => setAttributes( {myAnchor} ) }
          />
       </PanelBody>
     </InspectorControls>
     <RichText
     tagName = {'h'+level}
     value = { content }
     onChange = { (content) => setAttributes({content})}
     placeholder ={__('Heading', 'accordion')}
     />
   </div>

	);
}
