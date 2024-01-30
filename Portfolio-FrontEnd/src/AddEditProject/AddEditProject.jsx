/* eslint-disable react/prop-types */
import {
  Container,
  TextField,
  Typography,
  styled,
  Button,
  IconButton,
  Modal,
  Stack,
} from "@mui/material";
import { useState } from "react";
import CollectionsIcon from "@mui/icons-material/Collections";

export default function AddEditProject({ projectData }) {
  
  const project = (projectData) ? projectData : {
    title: "",
    description: "",
    link: "",
    tags: [""],
    image: "",
  };

  const [newProjectImage, setNewProjectImage] = useState(project.image);
  const [newProjectTitle, setNewProjectTitle] = useState(project.title);
  const [newProjectDescription, setNewProjectDescription] = useState(
    project.description
  );
  const [newProjectLink, setNewProjectLink] = useState(project.link);
  const [newProjectTags, setNewProjectTags] = useState([
    project.tags.join(", "),
  ]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const image = reader.result
      setNewProjectImage(image);
    };
    reader.readAsDataURL(file);
  };

  const handleTextChange = (event, field) => {
    switch (field) {
      case "Título":
        setNewProjectTitle(event.target.value);
        break;
      case "Descrição":
        setNewProjectDescription(event.target.value);
        break;
      case "Link":
        setNewProjectLink(event.target.value);
        break;
      case "Tags":
        setNewProjectTags(event.target.value.split(","));
        break;
      default:
        break;
    }
  };

  const onSave = () => {
    alert(`
    Título do projeto: ${newProjectTitle}
    Link do projeto: ${newProjectLink}
    Descrição do projeto: ${newProjectDescription}
    Tags do projeto: ${newProjectTags.join(", ")}
    Imagem do projeto: ${newProjectImage}
    `);
  };

  const onCancel = () => {
    alert(`
    Título do projeto: ${project.title}
    Link do projeto: ${project.link}
    Descrição do projeto: ${project.description}
    Tags do projeto: ${project.tags.join(", ")}
    `);
  };

  return (
    <Modal open>
      <Container
        maxWidth={"md"}
        sx={{
          bgcolor: "#FEFEFE",
          flexDirection: "column",
          gap: "24px",
          pt: "24px",
          pb: "24px",
          overflowY: "auto",
          height: { xs: "100%", md: "auto" },
        }}
      >
        <Stack id="title-container">
          <Typography variant="h5">
            {projectData ? "Editar projeto" : "Adicionar projeto"}
          </Typography>
        </Stack>

        <Stack
          id="image-input-form-container"
          sx={{
            flexDirection: { xs: "column", sm: "row-reverse" },
            hight: { xs: "713px", sm: "336px" },
            width: { xs: "100%", sm: "826px" },
            gap: "16px",
            mt: "24px",
            mb: "16px",
          }}
        >
          <Stack
            id="input-side"
            sx={{
              width: { xs: "100%", sm: "413px" },
            }}
          >
            <Stack
              id="input-container"
              sx={{
                gap: "16px",
              }}
            >
              <InputText
                label="Título"
                defaultText={project.title}
                handleTextChange={handleTextChange}
              />
              <InputText
                label="Tags"
                defaultText={project.tags.join(", ")}
                handleTextChange={handleTextChange}
              />
              <InputText
                label="Link"
                defaultText={project.link}
                handleTextChange={handleTextChange}
              />
              <InputText
                label="Descrição"
                defaultText={project.description}
                handleTextChange={handleTextChange}
              />
            </Stack>
          </Stack>

          <Stack
            id="image-side-form"
            sx={{
              maxWidth: { xs: "100%", sm: "389px" },
              height: { xs: "353px", sm: "341px" },
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="subtitle1">
              Selecione o conteúdo que você deseja fazer upload
            </Typography>

            <Stack
              id="image-upload-container"
              sx={{
                bgcolor: "neutral.light",
                width: "100%",
                height: "304px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {newProjectImage ? (
                <Stack
                  id="image-container"
                  sx={{ width: "100%", height: "100%" }}
                >
                  <img
                    src={newProjectImage}
                    alt="Project's image"
                    onClick={() => setNewProjectImage(null)}
                    style={{}}
                  />
                </Stack>
              ) : (
                <Stack
                  id="upload-container"
                  sx={{
                    bgcolor: "neutral.light",
                  }}
                >
                  <Stack id="upload-button">
                    <IconButton
                      component="label"
                      variant="contained"
                      sx={{
                        flexDirection: "column",
                        gap: "16px",
                      }}
                    >
                      <CollectionsIcon fontSize="large" />
                      <Typography
                        variant="body2"
                        sx={{
                          alignSelf: "flex-start",
                        }}
                      >
                        Compartilhe seu talento com milhares de pessoas
                      </Typography>
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={(event) => handleImageUpload(event)}
                      />
                    </IconButton>
                  </Stack>
                </Stack>
              )}
            </Stack>
          </Stack>
        </Stack>

        <Stack
          id="button-container"
          spacing={2}
          sx={{
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <a href="/">
            <Typography variant="subtitle1">Visualizar publicação</Typography>
          </a>

          <Stack
            id="buttons"
            sx={{
              flexDirection: "row",
              gap: "16px",
            }}
          >
            <SaveButton variant="contained" color="secondary" onClick={onSave}>
              <Typography variant="button">Salvar</Typography>
            </SaveButton>

            <CancelButton variant="contained" onClick={onCancel}>
              <Typography variant="button">Cancelar</Typography>
            </CancelButton>
          </Stack>
        </Stack>
      </Container>
    </Modal>
  );
}

function InputText({ label, defaultText, handleTextChange }) {
  return (
    <TextField
      label={label}
      variant="outlined"
      multiline
      defaultValue={defaultText}
      rows={label === "Descrição" ? 4 : 1}
      onChange={(event) => handleTextChange(event, label)}
    />
  );
}

const SaveButton = styled(Button)({
  color: "#FCFDFF",
});

const CancelButton = styled(Button)({
  backgroundColor: "rgba(0, 0, 0, 0.12)",
  color: "rgba(0, 0, 0, 0.38)",
});