export const RegionDropDown = ({ value, setRegionIdentify, setIsOpen, isOpen }) => {
  const ValueClick = () => {
      setRegionIdentify(value)
      setIsOpen(!isOpen)
  }
  return(
      <li onClick={ValueClick}>{value}</li>
  )
}