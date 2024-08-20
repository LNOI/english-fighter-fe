'use client';
import React, { useEffect, useState } from 'react';
import ButtonCustom from '../ButtonCustom';
import { useAppSelector, useAppDispatch } from '@/lib/hook';
import AutoSearchIndicator from '@/components/ui/strategies/AutoSearchIndicator';
import { setCookie } from '@/lib/handleCookie';
import { DataIndicators } from '@/data/indicator';
import SelectCustom from '../SelectCustom';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { type } from 'os';
import { number } from 'zod';

const SOURCE_INDICATOR = [
  {
    id: 'open',
    name: 'Open'
  },
  {
    id: 'close',
    name: 'Close'
  },
  {
    id: 'low',
    name: 'Low'
  },
  {
    id: 'high',
    name: 'High'
  }
];
const IndicatorProperties = () => {
  const [indicator, setIndicator] = useState(null);
  const [inputFields, setInputFields] = useState([]);
  const properties = useAppSelector((state) => state.properties);

  const onChangeValueInputField = (parameters) => {
    let fields = [];
    let id = 1;
    Object.entries(parameters).map((item) => {
      fields.push({
        id: item[0],
        type: 'number',
        value: parseInt(item[1])
      });
      id++;
    });
    setInputFields(fields);
  };

  useEffect(() => {
    if (properties.key) {
      if (properties.data.name) {
        setIndicator(properties.data);
        onChangeValueInputField(properties.data.parameters);
      } else {
        setIndicator(null);
      }
    }
  }, [properties.key]);

  const onChangeSelectIndicator = (event, value) => {
    // //console.log(value)
    if (value) {
      setIndicator(JSON.parse(JSON.stringify(value)));
      onChangeValueInputField(value.parameters);
    }
    // onChangeValueInputField(value.parameters)
  };

  const handleChangeFieldValue = (event, fieldId) => {
    const updatedFields = [...inputFields];
    const index = updatedFields.findIndex((field) => field.id === fieldId);
    updatedFields[index].value = event.target.value;
    setInputFields(updatedFields);
  };
  const onSubmitIndicator = (event) => {
    event.preventDefault();
    const updated_indicator = indicator;
    inputFields.map((field) => {
      // //console.log(field);
      updated_indicator.parameters[field.id] = field.value;
    });

    // //console.log(updated_indicator);

    setCookie(
      properties.key,
      JSON.stringify({
        data: updated_indicator
      }),
      1
    );
    const ele = document.getElementById(properties.key);
    ele.click();
  };
  return (
    <Box
      component="form"
      autoComplete="off"
      noValidate={false}
      onSubmit={onSubmitIndicator}
    >
      <div className="flex flex-col">
        <AutoSearchIndicator
          indicator={indicator}
          onChange={onChangeSelectIndicator}
        ></AutoSearchIndicator>

        {indicator && (
          <div>
            <strong>{indicator.name} Setting</strong>
            <p>*Describe: {indicator.display_name}</p>
            <p>Type: {indicator.group}</p>

            <div className="flex flex-row">
              <p>Source</p>
              <SelectCustom
                value={indicator.input_names.price}
                menuItem={SOURCE_INDICATOR}
              ></SelectCustom>
            </div>
            <div>
              {inputFields?.map((field, index) => {
                return (
                  <div key={index}>
                    <p>{field.id}</p>
                    <TextField
                      required
                      name={field.id}
                      id={field.id}
                      type={field.type}
                      value={field.value}
                      onChange={(event) =>
                        handleChangeFieldValue(event, field.id)
                      }
                    ></TextField>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {/* <p>{properties.type}</p> */}
        <ButtonCustom
          content={'Save'}
          type={3}
          // onFunction={onSaveIndicator}
          onClick={() => {}}
        ></ButtonCustom>
      </div>
    </Box>
  );
};

export default IndicatorProperties;
