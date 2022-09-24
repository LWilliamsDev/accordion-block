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
import { useBlockProps, InnerBlocks, BlockControls } from '@wordpress/block-editor';
import { useSelect, dispatch } from '@wordpress/data';

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
export default function Edit({clientId}) {
  const ALLOWED_BLOCKS = ['accordion/accordion-header', 'accordion/accordion-content'];
  const TEMPLATE = [
    ['accordion/accordion-header', {placeholder: __('Add Accordion Heading Here', 'accordion')}],
    ['accordion/accordion-content', {placeholder: __('Add Accordion Content Here', 'accordion')}]
  ];

  //Get ID attribute of accordion content (stored in the myAnchor attribute) and place it into the accordion header's target attribute, which gets outputted into aria-controls and aria-labelledby on front end
  const accHeader = useSelect( (select) => select('core/block-editor').getBlock(clientId).innerBlocks[0]);
  const accPanel = useSelect( (select) => select('core/block-editor').getBlock(clientId).innerBlocks[1]);

  if (accPanel && accHeader) {
    const accPanelId = accPanel.attributes.myAnchor;
    dispatch('core/block-editor').updateBlockAttributes(accHeader.clientId, {target: accPanelId});
    const accHeaderId = accHeader.attributes.myAnchor;
    dispatch('core/block-editor').updateBlockAttributes(accPanel.clientId, {headerId: accHeaderId});
  }


  const blockProps = useBlockProps();


	return (
    <div { ...blockProps }>
     <InnerBlocks allowedBlocks={ALLOWED_BLOCKS} template={TEMPLATE} templateLock="all" />
   </div>
	);
}
