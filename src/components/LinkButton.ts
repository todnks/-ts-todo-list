interface IInkButton {
  href?: string,
  id?: string,
  className?: string,
  value?: string,
}
export default function LinkButton({ href, id, className, value }: IInkButton) {
  return `
    <a 
    data-hash="${href}"
     id="${id}"
    ${className ? `class='${className}'` : ''}
     >${value}</a>
  `;
}