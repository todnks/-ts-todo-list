interface IInput {
  id?: string,
  type?: string,
  className?: string,
  placeholder?: string,
  autofoucs?: boolean,
  data?: string
}

export default function Input({ type, className, placeholder, autofoucs, data }: IInput) {
  return `
    <input
      type="${type}"
      class="${className}"
      placeholder="${placeholder}"
      data-id="${data}"
      ${autofoucs ? 'autofoucs' : ''}"
    />
  `;
}