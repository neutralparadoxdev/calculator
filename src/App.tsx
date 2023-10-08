import React, { useState } from 'react';
import './App.css';
import { Calculator } from './Calculator';

function App() {

  const [legalDisclaimerToggle, setLegalDisclaimerToggle] = useState<boolean>(true);
  return (
    <>
      <h1>Calculator</h1>
      <h3>*This is a practice project created for programming sake. It uses a combination
        of js number values (64-bit floating point) and converting from and to strings. Check
        the legal disclaimer / license. No warranty. Use at own risk. Like calculating random numbers</h3>
      <Calculator />

      <h3 className="legal-disclaimer-title">Legal Disclaimer / License<button onClick={() => setLegalDisclaimerToggle((val) => !val)}>toggle</button></h3>
      { legalDisclaimerToggle ? (<div className="legal-disclaimer">
      <p>Copyright 2023 Neutral Paradox Dev</p>

      <p>Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:</p>

      <p>1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.</p>

      <p>2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.</p>

      <p>3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.</p>

      <p>THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS “AS IS” AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.</p>
      </div>) : <></>
      }
    </>
  );
}

export default App;
