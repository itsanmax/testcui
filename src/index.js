/**
 * @author:  sandeep.gupta1@timesinternet.in
 * @desc: entry  point  to  render react components  based on environment
 */
 import React from 'react';
 import PropTypes from 'prop-types';
 import { createRoot } from "react-dom/client";

 import TestUiCommon from "./testuicommon";
 // import { User, Input } from '@denui/denmark-ui-components/dist/main';

 

const renderApplication = (element, reqObj={}, callbackNgFn = null) => {
    console.log("== Inside React Project: renderApplication ===", element);

    // const handleChange = (obj, flag) => {
    //     console.log(obj, flag);
    // };

    const root = createRoot(element);
    root.render(
        <div>
            Test Common UI components:
            <TestUiCommon></TestUiCommon>
            {/* User component:
            <User />
            Input component:

            <Input label="test" name="Title" 
                onBlur={handleChange}
                onKeyUp={handleChange}
                onChange={handleChange}
                helperText="Enter the Title" /> */}
        
            
        </div>
    );
  }

  renderApplication(document.getElementById('root'));