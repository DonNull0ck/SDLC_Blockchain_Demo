# SDLC_Blockchain_Demo
A prototype blockchain developed internally by SDLC Partners L.P

# How to set up the code base?
Assuming <b>node</b> and <b>npm</b> are insalled in your machine. Requires <b>node.js v8</b> or higher.

<b>Installing truffle:</b> truffle-cli provides tool to compile,migrate,test, build the smart contracts.

<b>npm install -g truffle</b>

<b>Installing ganache-cli:</b> Ganache-cli is a personal blockchain for Ethereum development you can use to deploy contracts, develop applications, and run tests on.

<b>npm install -g ganache-cli</b>

<p>Once you have these installed correctly, clone the project and cd into <b>project_code_base</b></p>
<p>Open terminal or cmd and cd into <b>project_code_base</b> and run <b>truffle compile</b></p>
<p>If the command runs successfully, you will see <b>build</b> folder </p>
<p>After compile, run <b>ganache-cli -b 3 </b> it will start your blockchain instance and listen to the port <b>8545</b>. Leave this window open</p>
<p>Open new terminal/cmd window and cd into <b>project_code_base</b> and run <b>truffle migrate</b>
<p>Open new terminal/cmd window and cd into <b>project_code_base/ui</b> and run <b>npm install</b>
<p>From <b>project_code_base/ui</b> run <b>npm start</b>, it will start the application at port <b>3000</b>
  
 # Troubleshooting:
  <p>If you face any issues while building and running the project, please consider the following steps: </p>
  <ul>
  <li>Disable the metamask plugin from chrome, if you are using one!</li>
  <li>Make sure truffle version is @4.1.15, you can force npm to install the particual version by doing: npm install truffle@4.1.15</li>
  <li>The'contacts' folder inside ui/src/ is a symbolic link refering to build/contracts directly inside the project_code_base, this link   can be broken/won't work based on your operating system, so you could manually copy all the files from build/contracts from project_code_base and paste it inside ur/src/contracts</li>


  </ul>




