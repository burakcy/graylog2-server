import React from 'react';
import { mount } from 'enzyme';
import { List, Set } from 'immutable';

import FieldList from './FieldList';
import FieldType from "../../logic/fieldtypes/FieldType";
import FieldTypeMapping from "../../logic/fieldtypes/FieldTypeMapping";

describe('<FieldList />', () => {
  const properties = [{ enumerable: true }];
  const fieldType1 = new FieldType('string', properties, []);
  const fieldTypeMapping1 = new FieldTypeMapping('date', fieldType1);

  const fieldType2 = new FieldType('string', properties, []);
  const fieldTypeMapping2 = new FieldTypeMapping('http_method', fieldType2);

  const allFields = new List([ fieldTypeMapping1, fieldTypeMapping2 ]);
  const fields = new List([ fieldTypeMapping2 ]);

  it('should render a FieldList', () => {
    const wrapper = mount(<FieldList allFields={allFields} fields={fields} maximumHeight={1000} />);
    expect(wrapper.find('span.field-element').text()).toBe('http_method');
  });

  it('should render a all fields in FieldList after click', () => {
    const wrapper = mount(<FieldList allFields={allFields} fields={fields} maximumHeight={1000} />);
    expect(wrapper.find('span.field-element').length).toBe(1);
    wrapper.find('a[children="all"]').simulate('click');
    expect(wrapper.find('span.field-element').length).toBe(2);
    expect(wrapper.find('span.field-element').at(0).text()).toBe('date');
    expect(wrapper.find('span.field-element').at(1).text()).toBe('http_method');


    wrapper.find('a[children="current streams"]').simulate('click');
    expect(wrapper.find('span.field-element').length).toBe(1);
    expect(wrapper.find('span.field-element').text()).toBe('http_method');
  });

  it('should search in the field list', () => {
    const wrapper = mount(<FieldList allFields={allFields} fields={fields} maximumHeight={1000} />);
    expect(wrapper.find('span.field-element').length).toBe(1);
    wrapper.find('a[children="all"]').simulate('click');
    expect(wrapper.find('span.field-element').length).toBe(2);

    wrapper.find('input#common-search-form-query-input').simulate('change', { target: { value: 'http_method' } });
    wrapper.find('form').simulate('submit');

    expect(wrapper.find('span.field-element').length).toBe(1);
    expect(wrapper.find('span.field-element').text()).toBe('http_method');
  });
});
