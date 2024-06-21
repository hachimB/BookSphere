export const getBooks = (req, res) => {
  return res.status(200).send('Hello world!');
}

export const postBooks = (req, res) => {
  return res.status(200).send('Hello world! Here the post Method');
}

export const putBooks = (req, res) => {
  return res.status(200).send(`update the book with the id = ${req.params.id}` );
}

export const deleteBooks = (req, res) => {
  return res.status(200).send(`delete the book with the id = ${req.params.id}`);
}
