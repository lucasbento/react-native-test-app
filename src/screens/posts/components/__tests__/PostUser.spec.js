import React from 'react';
import {shallow} from '../../../../configuration/renderer';
import PostUser from '../PostUser';
import user from '../../../../../__fixtures__/user';

describe('<PostUser />', () => {
  const props = {
    name: user.name,
    username: user.username,
    company: user.company,
  };

  it('renders correctly', async () => {
    const {output} = shallow(<PostUser {...props} />);

    expect(output).toMatchSnapshot();
  });
});
