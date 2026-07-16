const fs = require('fs');
let code = fs.readFileSync('src/components/FinanceView.tsx', 'utf8');

// The lines currently around 833-834 are:
//                         </div>
//                 </div>
//               </div>
//               {/* CHART 2: RECENT TRANSACTIONS CHRONOLOGY SLIDES */}

const search = `                        </div>
                </div>
              </div>
              {/* CHART 2: RECENT TRANSACTIONS CHRONOLOGY SLIDES */}`;

const replace = `                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* CHART 2: RECENT TRANSACTIONS CHRONOLOGY SLIDES */}`;

code = code.replace(search, replace);
fs.writeFileSync('src/components/FinanceView.tsx', code);
