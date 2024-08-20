'use client';
import React, { useEffect, useState } from 'react';
import { attr_config } from '@/data/config';
import Box from '@mui/material/Box';
import InputCustom from '../InputCustom';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import ButtonCustom from '../ButtonCustom';
import { useFormState, useFormStatus } from 'react-dom';
import { doSaveConfigStrategies } from '@/app/actions';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import SelectCustom from '@/components/ui/SelectCustom';
import { get } from '@/lib/api';

const label = { inputProps: { 'aria-label': 'Color switch demo' } };

export default function MainConfig() {
  const [config, setConfig] = useState([]);
  const [currentConfig, setCurrentConfig] = useState(null);
  const [fields, setFields] = useState([]);
  const [state, formAction] = useFormState(doSaveConfigStrategies, undefined);

  const onCreateNewConfig = () => {
    setFields([...attr_config]);
  };

  const onChangeSelectConfig = (e) => {
    const obj = JSON.parse(
      JSON.stringify(config.find((obj) => obj.id === e.target.value))
    );
    setCurrentConfig(obj);
    obj.config_data = JSON.parse(obj.config_data);
    //console.log(obj.config_data);
    const new_attr_config = [...attr_config];
    //console.log(new_attr_config);
    for (let i = 0; i < new_attr_config.length; i++) {
      const name_p = new_attr_config[i].name;
      if (typeof obj.config_data[name_p] === 'object') {
        for (let j = 0; j < new_attr_config[i].children.length; j++) {
          const name_c = new_attr_config[i].children[j].name;
          if (typeof obj.config_data[name_p][name_c] === 'object') {
          } else {
            new_attr_config[i].children[j].default =
              obj.config_data[name_p][name_c];
          }
        }
      } else {
        new_attr_config[i].default = obj.config_data[name_p];
      }
    }
    setFields([...new_attr_config]);
  };

  useEffect(() => {
    if (config.length === 0) {
      const fetchConfig = async () => {
        try {
          const data = await get(
            '/api/user/00000000-0000-0000-0000-000000000000/config'
          );
          setConfig(data);
          if (data.length > 0) {
            data[0].config_data = JSON.parse(data[0].config_data);
            //console.log(data);
            setCurrentConfig(data[0]);
          }
        } catch (error) {}
      };
      fetchConfig().catch(console.error);
    }
  }, []);

  return (
    <div className="w-2/4">
      <div>
        <SelectCustom
          menuItem={config}
          value={currentConfig?.id ?? null}
          onChangeSelect={onChangeSelectConfig}
        ></SelectCustom>
        <ButtonCustom
          content={'Create New Config'}
          type={4}
          onClick={onCreateNewConfig}
        ></ButtonCustom>
      </div>

      <Box
        component="form"
        autoComplete="off"
        noValidate={false}
        action={formAction}
      >
        <input
          type="text"
          id="uuid_config"
          name="uuid_config"
          value={currentConfig?.id}
          hidden
        />
        <div className="flex flex-col space-y-4">
          {fields.map((field, index) => {
            return (
              <div
                key={index}
                className="flex flex-row items-center justify-center space-x-4"
              >
                <p className="text-nowrap font-medium text-red-400">
                  {field.title ? field.title : field.name}
                </p>
                <div className="w-5/6">
                  {field.type === 'select' && (
                    <Select
                      id={'select-' + field.name}
                      name={field.name}
                      defaultValue={field.default}
                    >
                      {field.menu?.map((item, idx) => {
                        return (
                          <MenuItem key={idx} value={item.id}>
                            {item.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  )}
                  {field.type === 'boolean' && (
                    <>
                      <Switch
                        {...label}
                        id={field.name}
                        name={field.name}
                        defaultChecked
                        color="warning"
                      />
                    </>
                  )}
                  {field.type === 'number' && (
                    <OutlinedInput
                      id={field.name}
                      name={field.name}
                      type="float"
                      required={field.required}
                      defaultValue={field.default}
                    ></OutlinedInput>
                  )}
                  {field.type === 'integer' && (
                    <OutlinedInput
                      id={field.name}
                      name={field.name}
                      type="number"
                      required={field.required}
                      defaultValue={field.default}
                    ></OutlinedInput>
                  )}
                  {field.type === 'string' && (
                    <OutlinedInput
                      id={field.name}
                      name={field.name}
                      required={field.required}
                      defaultValue={field.default}
                    ></OutlinedInput>
                  )}

                  {field.children.length > 0 && (
                    <div className="ml-4">
                      {field.children.map((children_field, index2) => {
                        return (
                          <div
                            key={index2}
                            className="flex flex-row items-center space-x-4"
                          >
                            <p className="text-nowrap font-medium">
                              {children_field.title}
                            </p>
                            {children_field.type === 'select' && (
                              <Select
                                id={'select-' + children_field.name}
                                name={field.name + '_' + children_field.name}
                                defaultValue={children_field.default}
                              >
                                {children_field.menu?.map((item, idx) => {
                                  return (
                                    <MenuItem key={idx} value={item.id}>
                                      {item.name}
                                    </MenuItem>
                                  );
                                })}
                              </Select>
                            )}
                            {children_field.type === 'boolean' && (
                              <>
                                <Switch
                                  name={field.name + '_' + children_field.name}
                                  {...label}
                                  defaultChecked
                                  color="warning"
                                />
                              </>
                            )}
                            {children_field.type === 'number' && (
                              <OutlinedInput
                                id={children_field.name}
                                name={field.name + '_' + children_field.name}
                                required={children_field.field}
                                type={'float'}
                                defaultValue={children_field.default}
                              ></OutlinedInput>
                            )}
                            {children_field.type === 'integer' && (
                              <OutlinedInput
                                id={children_field.name}
                                name={field.name + '_' + children_field.name}
                                required={children_field.field}
                                type={'number'}
                                defaultValue={children_field.default}
                              ></OutlinedInput>
                            )}
                            {children_field.type === 'string' && (
                              <OutlinedInput
                                id={children_field.name}
                                name={field.name + '_' + children_field.name}
                                required={children_field.field}
                                type={'string'}
                                defaultValue={children_field.default}
                              ></OutlinedInput>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex flex-row space-x-4">
          <ButtonCustom
            type={3}
            content={'Save'}
            onClick={() => {}}
          ></ButtonCustom>
        </div>
      </Box>
    </div>
  );
}
