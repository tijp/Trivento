import React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';

const Input = styled.input`
  background-color: #ECF0F1;
  border: 2px solid transparent;
  border-radius: 3px;
  font-size: 16px;
  font-weight: 200;
  padding: 10px 0;
  width: 220px;
  transition: border .5s;
  padding-left: 20px;
  display: block;
  margin: auto;
  margin-bottom: 10px;

  &:focus {
    border: 2px solid #3498DB;
    box-shadow: none;
    outline: none;
  }
`;

export default observer(({ field, type = 'text', value = null, placeholder = null }) => (
  <Input
    aria-describedby="name-desc"
    {...field.bind({ type, value, placeholder })}
  />
));
