import {Box, Input, Stack, Tooltip, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {green, orange, red} from "@mui/material/colors";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import {useState} from "react";
import {z} from "zod";
import {ZodType} from "zod/lib/types";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";

interface InlinedEditableProps {
    text: string;
    onSubmit: (value: string) => void;
    validator?: ZodType,
}

export const InlinedEditable = ({text, onSubmit, validator = z.string()}: InlinedEditableProps) => {
    const [isEditing, setIsEditing] = useState(false);

    const schema = z.object({
        editable: validator
    });

    type EditableFormData = z.infer<typeof schema>;


    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<EditableFormData>({
        resolver: zodResolver(schema),
    });

    return (
        <Stack direction={'row'}>
            {!isEditing &&
                <Typography>
                    {text}
                </Typography>
            }
            {isEditing &&
                <Box component="form">

                    {errors.editable ?
                        <Tooltip title={errors.editable.message as string}>
                            <Input defaultValue={text} sx={{maxHeight: '25px'}}
                                   {...register("editable")}
                                   error={!!errors.editable}
                                   size="small"
                                   {...register("editable")}
                            />
                        </Tooltip> :

                        <Input defaultValue={text} sx={{maxHeight: '25px'}}
                               {...register("editable")}
                               error={!!errors.editable}
                               size="small"
                               {...register("editable")}
                        />
                    }

                    <IconButton aria-label="delete" size="small"
                                sx={{marginTop: '-3px', marginLeft: '5px', color: red[500]}}
                                onClick={() => {
                                    setIsEditing(false);
                                }}>
                        <DeleteIcon fontSize="inherit"/>
                    </IconButton>

                    <IconButton aria-label="delete" size="small"
                                sx={{marginTop: '-3px', marginLeft: '5px', color: green[500]}}
                                onClick={handleSubmit(({editable}) => {
                                    setIsEditing(false);

                                    if(editable === text) {
                                        return;
                                    }

                                    onSubmit(editable);
                                })}>
                        <CheckIcon fontSize="inherit"/>
                    </IconButton>
                </Box>
            }
            {!isEditing &&
                <IconButton aria-label="delete" size="small"
                            sx={{marginTop: '-3px', marginLeft: '5px', color: orange[600]}}
                            onClick={() => setIsEditing(true)}>
                    <EditIcon fontSize="inherit"/>
                </IconButton>
            }
        </Stack>
    );
};