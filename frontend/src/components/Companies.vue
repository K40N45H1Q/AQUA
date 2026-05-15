<template>
    <div class="wrapper">
        <h2>{{ $t('topEmployers') }}</h2>

        <div class="grid">
            <div class="item" v-for="employer in employers" :key="employer.name">
                <img :src="employer.logo" alt="" class="logo" />
                <div class="info">
                    <span class="name">{{ employer.name }}</span>
                    <span class="count">{{ employer.count }} {{ $t('offers') }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.grid {
    padding: 0 20px 20px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 20px;
}

.item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    border-radius: 18px;
    background: #ffffff;
    border: 1px solid #eee;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.05);
    transition: all 0.25s ease;
    cursor: pointer;
    text-align: center;
}

.item:hover {
    transform: translateY(-6px);
    box-shadow: 0 10px 28px rgba(0, 0, 0, 0.08);
}

.logo {
    width: 100px;
    height: 100px;
    object-fit: contain;
    margin-bottom: 12px;
}

.info {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.info span {
    color: #000;
}

.name {
    font-weight: 600;
    font-size: 16px;
}

.count {
    font-size: 13px;
    color: #777;
}

.wrapper {
    max-width: 950px;
    margin: 0 auto;
}

h2 {
    text-align: center;
    padding: 30px;
    color: #000;
}
</style>

<script setup>
const employers = [
    { logo: "https://cv.lv/api/v1/files-service/1b5b6c0e-d360-4758-9da3-975ddaf1a9ae", name: "Virši-A", count: 25 },
    { logo: "https://cv.lv/api/v1/files-service/1765fd03-93b9-4cc7-8837-8c7bdd2937fc", name: "RAKUS", count: 24 },
    { logo: "https://cv.lv/api/v1/files-service/10c4e319-a48d-4e90-9703-62e76d1389ac", name: "Evolution", count: 9 },
    { logo: "https://cv.lv/api/v1/files-service/18105b84-3088-4557-b117-d972989a86b7", name: "Visidarbi", count: 47 },
    { logo: "https://cv.lv/api/v1/files-service/16b01df3-3386-42b6-aef4-b4853c9cfd93", name: "Lidl", count: 24 },
    { logo: "https://cv.lv/api/v1/files-service/104a7d62-1242-483a-8fe0-3c4312ec20f3", name: "Kreiss", count: 14 },
    { logo: "https://cv.lv/api/v1/files-service/1a5c68dd-f77d-4bf3-9a8f-d570c4c1cf75", name: "RIX Airport", count: 10 },
    { logo: "https://cv.lv/api/v1/files-service/17d6d9f9-4452-42e5-98ce-9d16784b308f", name: "Epson", count: 7 },
    { logo: "https://cv.lv/api/v1/files-service/166eadb2-46b6-4b47-b97d-e1535a04ace3", name: "CV-Online", count: 41 },
    { logo: "https://cv.lv/api/v1/files-service/1d3afb33-7427-49fb-a8f2-00ddc5bf473e", name: "Industra", count: 4 },
    { logo: "https://cv.lv/api/v1/files-service/13472bfc-7d8e-45de-b52a-2395cfb08611", name: "Circle K Biz", count: 37 },
    { logo: "https://cv.lv/api/v1/files-service/110761fc-cfbc-4e55-b249-e5dba97ccfe8", name: "Cabot", count: 9 },
    { logo: "https://cv.lv/api/v1/files-service/12df6bcf-67a4-45b8-b632-3153355222d9", name: "Roche", count: 9 },
    { logo: "https://cv.lv/api/v1/files-service/12a2383b-3a80-47ff-a42b-31c2e7e787bd", name: "Atea", count: 15 },
    { logo: "https://cv.lv/api/v1/files-service/1ca6ae45-04b4-4f39-9a28-b56a551a14a6", name: "Tet", count: 18 },
    { logo: "https://cv.lv/api/v1/files-service/1516e44b-4326-491b-b131-eeda891ac9ef", name: "Circle K", count: 12 },
    { logo: "https://cv.lv/api/v1/files-service/1a446373-1705-4d6f-949f-24b1faafe7e5", name: "Accenture", count: 16 },
    { logo: "https://cv.lv/api/v1/files-service/1cdc6c5d-1e49-47e7-948f-d0bc6cdc62d2", name: "Jūrmala SPA", count: 7 },
    { logo: "https://cv.lv/api/v1/files-service/17c2bbf2-5fa7-435c-acae-271078021b49", name: "Luminor", count: 21 },
    { logo: "https://cv.lv/api/v1/files-service/11796b2f-0d6d-4190-a0ab-e4755514d917", name: "SEB", count: 25 },];
</script>