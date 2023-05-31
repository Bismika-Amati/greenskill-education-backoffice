import { Rule } from 'antd/es/form';

export const setRequired: Rule = {
  required: true,
};

export const setValidEmail: Rule = {
  type: 'email',
  message: 'The input is not valid E-mail!',
};
