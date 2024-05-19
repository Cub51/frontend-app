
const Toolbar = () => {
  return (
    <div  className="btn-toolbar" role="toolbar" aria-label="Toolbar with icons">
       <button type="button" className="btn btn-secondary" title="Bold" aria-label="Bold"><i className="fas fa-bold"></i></button>
    <button type="button" className="btn btn-secondary" title="Italic" aria-label="Italic"><i className="fas fa-italic"></i></button>
    <button type="button" className="btn btn-secondary" title="Underline" aria-label="Underline"><i className="fas fa-underline"></i></button>
    <button type="button" className="btn btn-secondary" title="Strikethrough" aria-label="Strikethrough"><i className="fas fa-strikethrough"></i></button>
    <button type="button" className="btn btn-secondary" title="Bulleted List" aria-label="Bulleted List"><i className="fas fa-list-ul"></i></button>
    <button type="button" className="btn btn-secondary" title="Numbered List" aria-label="Numbered List"><i className="fas fa-list-ol"></i></button>
    <button type="button" className="btn btn-secondary" title="Align Left" aria-label="Align Left"><i className="fas fa-align-left"></i></button>
    <button type="button" className="btn btn-secondary" title="Align Center" aria-label="Align Center"><i className="fas fa-align-center"></i></button>
    <button type="button" className="btn btn-secondary" title="Align Right" aria-label="Align Right"><i className="fas fa-align-right"></i></button>
    <button type="button" className="btn btn-secondary" title="Align Justify" aria-label="Align Justify"><i className="fas fa-align-justify"></i></button>
    <button type="button" className="btn btn-secondary" title="Indent" aria-label="Indent"><i className="fas fa-indent"></i></button>
    <button type="button" className="btn btn-secondary" title="Outdent" aria-label="Outdent"><i className="fas fa-outdent"></i></button>
    <button type="button" className="btn btn-secondary" title="Link" aria-label="Link"><i className="fas fa-link"></i></button>
    <button type="button" className="btn btn-secondary" title="Image" aria-label="Image"><i className="fas fa-image"></i></button>
    <button type="button" className="btn btn-secondary" title="Video" aria-label="Video"><i className="fas fa-video"></i></button>
 
    </div>
  );
};

export default Toolbar;