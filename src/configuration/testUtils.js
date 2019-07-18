const responses = {
  successful: ({data = undefined, ...rest} = {}) => ({
    status: 200,
    data,
    success: true,
    ...rest,
  }),
  failed: ({data = undefined, ...rest} = {}) => ({
    status: 500,
    data,
    success: false,
    ...rest,
  }),
};

export {responses};
