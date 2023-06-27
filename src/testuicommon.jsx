/* eslint-disable react/react-in-jsx-scope */
//import { User, Input } from '@denui/denmark-ui-components/dist/main';
// ./components/common
//import { User } from '@denui/denmark-ui-components/src/components/common/user/user.component';

import { User, Input, DenButton } from '@itsanmax/react-ui-components/dist/main';


const TestUiCommon = () => {

    
    const handleChange = (obj, flag) => {
        console.log(obj, flag);
    };
    
    return (
        <div>
            User comp:
            <User name="Gopal" age="25" />
            
            <Input label="test" name="Title" 
                onBlur={handleChange}
                onKeyUp={handleChange}
                onChange={handleChange}
                helperText="Enter the Title" />

            <DenButton variant="contained" color="primary">
                Test
            </DenButton>

            {/* <Input label="test" name="Title" 
                onBlur={handleChange}
                onKeyUp={handleChange}
                onChange={handleChange}
                helperText="Enter the Title" /> */}

        </div>
    );
};

export default TestUiCommon;


