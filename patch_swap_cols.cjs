const fs = require('fs');
let code = fs.readFileSync('src/components/FinanceView.tsx', 'utf8');

const theadOld = `<th className="p-3 font-bold text-right text-blue-800 bg-blue-50/50">Total Active Cap</th>
                          <th className="p-3 font-bold text-right">Spent / Obligated</th>`;
const theadNew = `<th className="p-3 font-bold text-right">Spent / Obligated</th>
                          <th className="p-3 font-bold text-right text-blue-800 bg-blue-50/50">Total Active Cap</th>`;

const tbodyOld = `<td className="p-3 text-right text-xs font-black text-blue-900 font-mono bg-blue-50/30">
                                {formatCurrency(activeCap)}
                              </td>
                              <td className="p-3 text-right text-xs font-semibold text-slate-700 font-mono">
                                {formatCurrency(obligations)}
                              </td>`;
const tbodyNew = `<td className="p-3 text-right text-xs font-semibold text-slate-700 font-mono">
                                {formatCurrency(obligations)}
                              </td>
                              <td className="p-3 text-right text-xs font-black text-blue-900 font-mono bg-blue-50/30">
                                {formatCurrency(activeCap)}
                              </td>`;

code = code.replace(theadOld, theadNew);
code = code.replace(tbodyOld, tbodyNew);

fs.writeFileSync('src/components/FinanceView.tsx', code);
