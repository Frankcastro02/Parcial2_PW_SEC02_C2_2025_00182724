const cuentas = require('../data/cuentas');

exports.getAll = (req, res) => {
  res.json({
    count: cuentas.length,
    data: cuentas
  });
};

exports.getId = (req, res) => {
  const id = req.params.id;
  const cuenta = cuentas.find(c => c._id === id);

  if (cuenta) {
    res.json({ finded: true, account: cuenta });
  } else {
    res.json({ finded: false });
  }
};

exports.getQuery = (req, res) => {
  const query = req.query.queryParam;
  const isActiveFilter = req.query.isActive;

  let results = cuentas;

  if (isActiveFilter !== undefined) {
    const isActiveBool = isActiveFilter === 'true';
    results = results.filter(c => c.isActive === isActiveBool);
  }

  if (query) {
    results = results.filter(c =>
      c._id === query ||
      c.client.toLowerCase().includes(query.toLowerCase()) ||
      c.gender.toLowerCase() === query.toLowerCase()
    ); 
  }

  if (results.length === 0) {
    res.json({ finded: false });
  } else if (results.length === 1) {
    res.json({ finded: true, account: results[0] });
  } else {
    res.json({ finded: true, data: results });
  }
};


exports.getBalance = (req, res) => {
   const active = cuentas.filter(c => c.isActive === true);

  if (active.length === 0) {
    return res.json({
      status: false,
      accBalance: 0
    });
  }

  const total = active.reduce((sum, c) => {
    return sum + parseFloat(c.balance);
  }, 0);

  res.json({
    status: true,
    accBalance: total
  });
};
