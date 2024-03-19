import React, {useState} from 'react';
import {Radio} from "@mui/material";

export const RadioWrapper = () => {
    const [value, setValue] = useState<boolean>(false);

    const onHandleChange = () => {
        setValue(true);
    }

    return (
        <div>
            <Radio
                // checked={selectedValue === 'a'}
                onChange={onHandleChange}
                value={value}
                name="radio-buttons"
                inputProps={{'aria-label': 'A'}}
            />
        </div>
    );
};

