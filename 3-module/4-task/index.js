function showSalary(users, age) {
  const userFiltred = users.filter(user => user.age <= age);
  let result = '';
  for (let i = 0; i < userFiltred.length; i++) {
    if (i === userFiltred.length - 1) {
      result += `${userFiltred[i].name}, ${userFiltred[i].balance}`;
    } else {
      result += `${userFiltred[i].name}, ${userFiltred[i].balance}\n`;
    }
  }
  return result;
}
