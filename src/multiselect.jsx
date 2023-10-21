import { useEffect, useState } from "react";
import Multiselect from "multiselect-react-dropdown";

const MyComponent = ({ setStudentData }) => {
  const initialOptions = [
    { name: "hindi", id: 1 },
    { name: "english", id: 2 },
    { name: "math", id: 2 },
    { name: "science", id: 2 },
    { name: "french", id: 2 },
  ];
  const [options] = useState(initialOptions);
  const [selectedValue, setSelectedValue] = useState([]);
  useEffect(() => {
    setStudentData((prev) => {
      let temp = { ...prev };
      temp.subjects = [...selectedValue];
      return temp;
    });
  }, [selectedValue]);

  const [forApi, setForApi] = useState([]);
  const onSelect = (selectedList, selectedItem) => {
    setForApi(selectedList);
    setSelectedValue((prev) => {
      let temp = [...prev, selectedItem.name];
      return temp;
    });
  };

  const onRemove = (selectedList, removedItem) => {
    setForApi(selectedList);
    setSelectedValue((prev) => {
      let temp = prev.filter((item) => item != removedItem.name);
      return temp;
    });
  };

  return (
    <Multiselect
      options={options}
      selectedValues={forApi}
      onSelect={onSelect}
      onRemove={onRemove}
      displayValue="name"
    />
  );
};

export default MyComponent;
