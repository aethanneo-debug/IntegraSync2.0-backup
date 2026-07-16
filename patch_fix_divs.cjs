const fs = require('fs');
let code = fs.readFileSync('src/components/FinanceView.tsx', 'utf8');

const strToReplace = `                    </table>
                  </div>
              </div>
            )}`;

const replacement = `                    </table>
                  </div>
                </div>
              </div>
            )}`;

code = code.replace(strToReplace, replacement);
fs.writeFileSync('src/components/FinanceView.tsx', code);
