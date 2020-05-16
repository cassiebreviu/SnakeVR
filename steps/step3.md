## How to host your game as a static site on Microsoft Azure Cloud

1. Go to https://portal.azure.com
2. Click `Create a resource`
3. Click `Storage account`
4. Select `Create new` Resource Group
5. Give your storage account a name. Something like `myawesomegame`
6. Select a Location (this is the location of the data center that has all the servers ready for us to use)
7. Leave the defaults for all the other fields the click `Review + create`
8. Click Create. It will take a minute to deploy and create your resource
9. Go to the resource when you get the confirmation that it has been created
10. Click `Static website` from the left hand navigation then click `Enabled`
11. Index document name is `index.html` then click `Save`
12. Select the `$Web` link that appears after your save. This will bring us to the blob storage we want to upload our files to.
13. Click `Upload`
14. Click the Folder Icon to navigate to your `index.html` and `index.js` files that we created in this tutorial
15. Select both the `index.html` and `index.js` files and click open
16. Click `Upload`
17. Exit out of the upload pane by clicking the `X` in the upper right corner.
18. Select `Change access level` from the top nav
19. Select `Container (anonymous read access for containers and blobs)`
20. Select `OK`
21. Use the bread crumbs nav at the very top to navigate back to the static website pane.
22. Copy the `Primary endpoint` url and paste it into the browser. (Make sure the Index Document name is set to `index.html`)
23. TADA! Your game is hosted! Thanks Azure! :D

[<- Prev Step](step2.md)
