const DocIcon = ({ color }) => {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M26.6667 3.33333V18.3333H18.3333V26.6667H3.33333V3.33333H26.6667ZM26.6667 0H3.33333C1.5 0 0 1.5 0 3.33333V26.6667C0 28.5 1.5 30 3.33333 30H20L30 20V3.33333C30 1.5 28.5 0 26.6667 0ZM15 18.3333H6.66667V15H15V18.3333ZM23.3333 11.6667H6.66667V8.33333H23.3333V11.6667Z"
        fill={color}
      />
    </svg>
  )
}
export default DocIcon
