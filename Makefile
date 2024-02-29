doc_build:
	docker-compose up -d --build --wait
watch:
	docker compose watch
i:
	npm i --legacy-peer-deps --save