## Create a Node.js Application via Cloud Foundry Command Line Interface

https://developers.sap.com/tutorials/btp-cf-buildpacks-node-create.html

## How to Deploy:

1. Open a command-line console.

2. Set the Cloud Foundry API endpoint for your subaccount. Execute (using your actual region URL):

```
cf api https://api.cf.us21.hana.ondemand.com
```

3. Log in to SAP BTP, Cloud Foundry environment:

```
cf login

or

cf login -a https://api.cf.us21.hana.ondemand.com --sso
```

4. Deploy the application on Cloud Foundry. To do that, in the node-tutorial directory, execute:

```
cf push
```

<pre>
Make sure you always execute cf push in the folder where the manifest.yml file is located! In this case, that’s node-tutorial.
</pre>

## Build error

https://answers.sap.com/questions/13113927/deployment-project-failed-app-staging-failed-in-th.html

Modify node version in package.json

```json
"engines": {
    "node": "14.20.0"  // 16.18.1 14.19.3 ^12.18
  }
```

Unable to install node: no match found for ^12.18 in [14.20.0 14.20.1 16.17.0 16.17.1 18.9.0 18.10.0]

5. Add entitlement Cloud Fundary Runtime and assign it to subaccount
   https://answers.sap.com/questions/556246/cloud-foundry-trial--you-have-exceeded-the-total-r.html

6. Create quota plan in subaccount and assign it CF space

7. Create an xsuaa service instance named nodeuaa with plan application. To do that, execute the following command in the node-tutorial directory:

```
  cf create-service xsuaa application nodeuaa -c xs-security.json
```

8. add User-Provided env variables
   https://blogs.sap.com/2020/09/09/disable-x-frame-options-in-scp-portal-cloud-foundry/
   https://help.sap.com/docs/btp/sap-business-technology-platform/environment-variables

https://help.sap.com/docs/btp/sap-business-technology-platform/setting-up-your-own-application-router

```
// on CF Space UI, add variables
  SEND_XFRAMEOPTIONS = "ALLOW-FROM hana.ondemand.com"

// use CLI
cf set-env <myApp1> SEND_XFRAMEOPTIONS false

// or add it in manifest.yaml
  env:
    SEND_XFRAMEOPTIONS: "ALLOW-FROM hana.ondemand.com"
```

9. Change route https://node-api-sit02.cfapps.us21.hana.ondemand.com to node-api-erwflptest.cfapps.us30.hana.ondemand.com, app name and subaccount region need to be changed, then do `cf push`

JWT TOKEN decoder
https://token.dev/

Implement axios interceptor for access_token and refresh_token
https://mp.weixin.qq.com/s/6JZ2OO9_mJMrFNHzxgZoDg -- 拦截器实现用户无感刷新 access_token

ODS ACD
https://wiki.one.int.sap/wiki/display/Eureka/ACD

High Level Architecture
See attached image

App / Central Router
https://blogs.sap.com/2020/10/02/serverless-sap-fiori-apps-in-sap-cloud-platform/
https://blogs.sap.com/2021/05/17/sap-tech-bytes-faq-managed-approuter-vs.-standalone-approuter/
https://blogs.sap.com/2020/09/11/html5-applications-managed-by-sap-cloud-platform-the-new-way-of-developing-html5-apps/ (“HTML5 Applications Managed by….”)

Advice
Fiori Elements might only work or at least work better with oData (instead of Rest)
