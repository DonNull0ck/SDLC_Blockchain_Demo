# SDLC_Blockchain_Demo
A prototype decentralized application (dApp) utilizing Blockchain developed internally by SDLC Partners L.P

# Codebase initial setup 
Assuming <b>node</b> and <b>npm</b> are insalled in your machine. Requires <b>node.js v8</b> or higher.
<p> Also assuming you have already pulled a copy of the repo down using <b> git pull </b> in Git itself or downloading and unzipping the code base from GitHub. </p>
<p> To learn more about the project dependencies please consult the document "Dependency Checklist SDLC Blockchain App".</p>
<p> Some differences between setting up the code base initially and running an existing code base will be noted below. </p>

<b>Installing truffle:</b> truffle-cli provides tool to compile,migrate,test, build the smart contracts.

<b> NOTE: DO NOT USE THE "-g" (global) PART OF THE BELOW COMMANDS ON A HOSTED ENVIRONMENT (E.G. THE VM). ONLY USE ON LOCAL MACHINES (E.G. YOUR PC). </b> For example, use <b> npm install truffle @4.1.14 </b> and <b> npm install ganache-cli </b>. Really, using "-g" is not best practice, it is more for convenience (i.e. so you do not have to keep setting up the code base repeatedly if you make local copies). 

<p> Also, do note that some commands require root/admin privilege. The below commands assume you are using a shell with root/admin access. If you are not, write <b> sudo </b> before the below commands to use root/admin access. For example: <b> sudo npm install -g truffle@4.1.15 </b> You may have to authenticate each time if you do it this way. You do not need sudo for everything, so it is a good idea (but less convenient) to only add it when needed. 

<b>npm install -g truffle@4.1.15</b>

<b>Installing ganache-cli:</b> Ganache-cli is a personal blockchain for Ethereum development you can use to deploy contracts, develop applications, and run tests on.

<b>npm install -g ganache-cli</b>

<p>Once you have these installed correctly, clone the project and cd into <b>project_code_base</b></p>
<p>Open terminal or cmd and cd into <b>project_code_base</b> and run <b>truffle compile</b></p>
<p>If the command runs successfully, you will see <b>build</b> folder </p>
<p>Note: If the command does not do anything, either it did not work (unlikely), or the compilation occured before and does not need done again. It does not hurt anything to run it every time you run the app, even if unnecessary.</p>
<p>After compile, run <b>ganache-cli -b </b> it will start your blockchain instance and listen to the port <b>8545</b>. Leave this window open</p>
<p>Open new terminal/cmd window and cd into <b>project_code_base</b> and run <b>truffle migrate</b>
<p>Open a new terminal/cmd window and cd into <b>project_code_base/ui</b>. Note: If this is the first time you are setting up the environment, then run <b>npm install</b>. If this has been done before (e.g. existing setup directory), then there is no need for it and you may receive error messages if you try to do it. 
<p>From <b>project_code_base/ui</b> run <b>npm start</b>, it will start the application at port <b>3000</b>
  
 # Troubleshooting and other important information:
  <p>If you face any issues while building and running the project, please consider the following steps: </p>
  <ul>
  <li> <b> If you are just trying to run an existing stable build of the app on the VM then please refer to the document: </b>  "Run SDLC Blockchain App On VM Instructions.docx". The instructions are VM-specfic, but still may be useful for setup (as of writing this document is the most complete guide). Other in-depth guides for how to run/setup the code base in different environments are in progress.  </li>
  <li>If one of the installs fail, pay attention to the errors. Some software has unexpected dependencies (e.g. Python 2) that will need installed first before the install above will succeed. To see what dependencies your folder has now, use this command while in that folder: <b> npm list --depth=0 </b>. Unmet dependencies will be shown with red text, extraneous (unnneeded) dependencies will be shown with green text. If you are having issues with depencenies (e.g. warnings about unmet dependencies, npm list shows warnings, etc.) you can use <b> npm audit fix </b> to have npm automatically try to fix issues for you or just <b> npm audit </b> to have npm show you the issues so you can manually fix them yourself by updating them (e.g. npm install {problemSoftware}@{versionNeeded}. If you would like to remove unnecessary software in the folder, you can use <b> npm prune </b>. Note: Some dependencies may be added or removed over time as the project evolves. Try to keep installed software minimal. For more information, consult the document "Dependency Checklist SDLC Blockchain App". </li>
  <li>Disable the metamask plugin from chrome, if you are using one!</li>
  <li>Truffle version MUST BE 4.1.15, you can force npm to install the particual version by doing: <b> npm install truffle@4.1.15 </b></li>
  <li>The'contacts' folder inside ui/src/ is a symbolic link refering to build/contracts directly inside the project_code_base, this link can be broken/won't work based on your operating system, so you could manually copy all the files from build/contracts from project_code_base and paste it inside ur/src/contracts. A more permanent solution would be to (re)create the symbolic link. This can be done via terminal or GUI in Windows (see https://www.howtogeek.com/howto/16226/complete-guide-to-symbolic-links-symlinks-on-windows-or-linux/), or on Linux/Mac from terminal use ln -s /[fullpath]/[to]/[build]/[contracts]/ [fullpath]/[to]/[ui]/[src]. </li>
 <li> When running consecutively, remember the app itself runs on port 3000 and the blockchain on 8545 (if using command line per the instructions). When rerunning you will want to stop the processes on those ports before starting them both again. The app will prompt you to switch ports automatically if you restart the app and forget to kill the existing app instance, <b> but the Blockchain will not!</b></li>
</ul>




