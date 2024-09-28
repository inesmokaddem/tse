import { useContext } from "react";
import styled from "styled-components";
import OrderContext from "../../../../../../../context/OrderContext";
import TextInput from "../../../../../../reusable-ui/TextInput";
import EditInfoMessage from "./EditInfoMessage";
import ImagePreview from "./ImagePreview";
import { getInputTextsConfig } from "./inputTextConfig";
import { useEffect } from "react";

export default function EditForm() {
  // state
  const { productSelected, setProductSelected, handleEdit, titleEditRef } =
    useContext(OrderContext);
  const inputTexts = getInputTextsConfig(productSelected);

  // comportements (gestionnaires d'événement ou "event handlers")
  const handleChange = (event) => {
    const { name, value } = event.target;

    const productBeingUpdated = {
      ...productSelected,
      [name]: value,
    };

    setProductSelected(productBeingUpdated); // cette ligne update le formulaire
    handleEdit(productBeingUpdated, event); // cette ligne update le menu
  };

  useEffect(() => {
    console.log("componentDidMount");
  }, []);

  // affichage
  return (
    <EditFormStyled>
      <ImagePreview
        imageSource={productSelected.imageSource}
        title={productSelected.title}
      />
      <div className="input-fields">
        {inputTexts.map((input) => (
          <TextInput
            {...input}
            key={input.id}
            onChange={handleChange}
            version="minimalist"
            ref={input.name === "title" ? titleEditRef : null}
          />
        ))}
      </div>
      <div className="submit">
        <EditInfoMessage />
      </div>
    </EditFormStyled>
  );
}

const EditFormStyled = styled.form`
  /* border: 2px solid black; */
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: repeat(4, 1fr);
  height: 100%;
  width: 70%;
  grid-column-gap: 20px;
  grid-row-gap: 8px;

  .input-fields {
    /* background: blue; */
    grid-area: 1 / 2 / -2 / 3;

    display: grid;
    grid-row-gap: 8px;
  }

  .submit {
    /* background: green; */
    grid-area: 4 / -2 / -1 / -1;
    display: flex;
    align-items: center;
    position: relative;
    top: 3px;
  }
`;