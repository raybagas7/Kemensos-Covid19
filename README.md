# Bantuan Sosial Kemensos Covid-19 (JDS)

Aplikasi yang diperuntukan untuk input data sipil atau warga yang membutuhkan bantuan sosial dari pemerintah

## Demo

- Website
  [[Kemensos Covid-19]](https://kemensos-covid19.vercel.app)
- JSON Server
  [[vercel-cov19-jds-jsonserver]](https://vercel-cov19-jds-jsonserver.vercel.app)

## Run Locally

Clone the project

```bash
  git clone https://github.com/raybagas7/Kemensos-Covid19.git
```

Go to the project directory

```bash
  cd Kemensos-Covid19
```

Install dependencies

```bash
  npm install
```

Start the json server

```bash
  npm run start:db
```

Start the application without build

```bash
  npm run dev
```

Start the application with build

```bash
  npm run build
  npm run start
```

## Civil Form Requirement

| Data             | Type               | Description                                                                                                                                                                     |
| :--------------- | :----------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `nama`           | `string`           | **Required**                                                                                                                                                                    |
| `nik`            | `number`           | **Required**                                                                                                                                                                    |
| `nkk`            | `number`           | **Required**                                                                                                                                                                    |
| `foto_ktp`       | `File`             | **Required** Maksimal 2MB, format JPG/JPEG/PNG/BMP                                                                                                                              |
| `foto_kk`        | `File`             | **Required** Maksimal 2MB, format JPG/JPEG/PNG/BMP                                                                                                                              |
| `umur`           | `number`           | **Required** Berumur lebih dari atau sama dengan 25 tahun                                                                                                                       |
| `kelamin`        | `enum`             | **Required** Laki-laki, Perempuan                                                                                                                                               |
| `provinsi`       | `enum`             | **Required** Berisikan pilihan seluruh Provinsi di Indonesia                                                                                                                    |
| `kab_kota`       | `enum`             | **Required** Berisikan pilihan seluruh Kab/Kota berdasarkan Provinsi yang dipilih                                                                                               |
| `kecamatan`      | `enum`             | **Required** Berisikan pilihan seluruh Kecamatan berdasarkan Kab/Kota yang dipilih                                                                                              |
| `kelurahan_desa` | `enum`             | **Required** Berisikan pilihan seluruh Kelurahan berdasarkan Kecamatan yang dipilih                                                                                             |
| `alamat`         | `string`           | **Required** Tidak lebih panjang dari 255 karakter                                                                                                                              |
| `rt`             | `number`           | **Required**                                                                                                                                                                    |
| `rw`             | `number`           | **Required**                                                                                                                                                                    |
| `gaji_sebelum`   | `number`           | **Required**                                                                                                                                                                    |
| `gaji_sesudah`   | `number`           | **Required**                                                                                                                                                                    |
| `alasan`         | `enum atau string` | **Required** - Kehilangan pekerjaan - Kepala keluarga terdampak atau korban Covid-19 - Tergolong fakir/miskin semenjak sebelum Covid-19, atau - Lainnya: … (bisa diisi sendiri) |
| `confirm`        | `boolean`          | **Required** true                                                                                                                                                               |
