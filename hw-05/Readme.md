### How to run

#### Start the zookeeper and kafka server
```
cd kafka
docker compose up -d
```

#### Install packages
```
cd service-a
npm install

cd ..

cd service-b
npm install
```

#### Start the services
```
cd service-a
npm start
```

```
cd service-b
npm start
```

#### Use live server to open the index.html file in the root directory