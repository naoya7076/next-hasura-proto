export default(req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-type', 'application/json')
  res.end(JSON.stringify({hoge:'fuga'}))
}