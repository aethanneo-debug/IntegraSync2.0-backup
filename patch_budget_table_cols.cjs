const fs = require('fs');
let code = fs.readFileSync('src/components/FinanceView.tsx', 'utf8');

const theadStr = '<th className="p-3 font-bold text-right">Total Base Allocation</th>\n                          <th className="p-3 font-bold text-right">Spent / Obligated</th>';
const newTheadStr = '<th className="p-3 font-bold text-right">Total Base Allocation</th>\n                          <th className="p-3 font-bold text-right">Retained Carryover</th>\n                          <th className="p-3 font-bold text-right text-blue-800 bg-blue-50/50">Total Active Cap</th>\n                          <th className="p-3 font-bold text-right">Spent / Obligated</th>';

const tbodyRegex = /<td className="p-3 text-right text-xs font-black text-slate-900 font-mono">\s*\{formatCurrency\(totalBase\)\}\s*<\/td>\s*<td className="p-3 text-right text-xs font-semibold text-slate-700 font-mono">\s*\{formatCurrency\(obligations\)\}\s*<\/td>/;
const newTbodyStr = '<td className="p-3 text-right text-xs font-black text-slate-900 font-mono">\n                                {formatCurrency(totalBase)}\n                              </td>\n                              <td className="p-3 text-right text-xs text-emerald-700 font-mono font-semibold">\n                                {formatCurrency(carryOver)}\n                              </td>\n                              <td className="p-3 text-right text-xs font-black text-blue-900 font-mono bg-blue-50/30">\n                                {formatCurrency(activeCap)}\n                              </td>\n                              <td className="p-3 text-right text-xs font-semibold text-slate-700 font-mono">\n                                {formatCurrency(obligations)}\n                              </td>';

code = code.replace(theadStr, newTheadStr);
code = code.replace(tbodyRegex, newTbodyStr);

fs.writeFileSync('src/components/FinanceView.tsx', code);
