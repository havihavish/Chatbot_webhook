# Installation guide and running the chatbot


## This chat bot consists of four parts
> dialogflow, solr api, botcopy, node.js:

-	Botcopy is a third-party application which provides the customized bot for front end which will be soon replaced by customized bot.
-	Dialogflow is the intelligence part which will be understanding the intentions of user. 
-	Solr api software is used for backend which acts like a search engine for user queries.
-	Node.js is used as a back-end code for function calls in webhook.

### Download solr here:

- https://lucene.apache.org/solr/downloads.html
#### Installation commands can be found here:
- https://lucene.apache.org/solr/guide/8_6/solr-tutorial.html
---
### Basic steps:

- Unzipping the Solr: unzip -q solr-8.6.0.zip
- Change the working directory: cd solr-8.6.0/
- To launch Solr: 

  o bin/solr start -e cloud on Unix or MacOS
 
  o bin\solr.cmd start -e cloud on Windows.
 
•	Collection creation and defining the schema

•	Indexing the data:
 o Linux/Mac: solr-8.6.0: $ bin/post -c <collection_name> <file_pat0068 (should be saved in SOLR)>
 
 Ex: bin/post -c techproducts example/exampledocs/*
 
 o Windows: C:\solr-8.6.0> java -jar -Dc=techproducts -Dauto example\exampledocs\post.jar example\exampledocs\*
 
•	To stop nodes: bin/solr stop -all
Note: Following the tutorial (https://lucene.apache.org/solr/guide/8_6/solr-tutorial.html) would give a detailed view of the installation process.


==>	Deploying SOLR in an EC2 instance:
https://lucene.apache.org/solr/guide/7_2/aws-solrcloud-tutorial.html


==>	Transferring data files from local system to cloud storage: FileZilla

Reference: https://stackoverflow.com/questions/16744863/connect-to-amazon-ec2-file-directory-using-filezilla-and-sftp


==>	Import and export in dialogflow:
•	Intents can be saved as a backup by using export functionality in dialogflow.

•	And new intents can be added to the bot by using import in dialogflow.

•	The exported zip files can be shared to anyone and they can use these files to run thebot on their system.

==>	Download and install node.js:

https://nodejs.org/en/download/

•	Install ngrok using this command:


npm install ngrok --save-dev

Running the chatbot:

	Open the node terminal in the working directory and run the following command:
•	npm run tunnel
	Copy the forwarding URL link and paste in the webhook URL in dialogflow.
	Start the EC2 instance
	Copy the EC2 instance IP address 
	Changing the IP address in the config.json file by replacing it with the new IP address.
	Run the following command to run and start the bot: 
•	node server.js
	Run the test queries in the dialogflow to check if bot is working.
