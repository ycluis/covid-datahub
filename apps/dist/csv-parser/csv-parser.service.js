"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CsvParserService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const csvParser = require("csv-parser");
let CsvParserService = class CsvParserService {
    async parseFromUrl(url) {
        const records = [];
        const response = await axios_1.default.get(url, {
            responseType: 'stream',
        });
        if (response.status !== 200) {
            throw new Error(`Failed to fetch CSV file from ${url}. Status: ${response.status}`);
        }
        return new Promise((resolve, reject) => {
            const stream = response.data;
            stream
                .pipe(csvParser())
                .on('data', (data) => records.push(data))
                .on('end', () => resolve(records))
                .on('error', (err) => reject(err instanceof Error ? err : new Error(String(err))));
        });
    }
};
exports.CsvParserService = CsvParserService;
exports.CsvParserService = CsvParserService = __decorate([
    (0, common_1.Injectable)()
], CsvParserService);
//# sourceMappingURL=csv-parser.service.js.map