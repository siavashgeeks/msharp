﻿namespace MSharp {
    export class BaseDatabase {

        structure: Array<IDatabaseTable>;
        db: IDBDatabase;

        /** Specifies the current version of the database schema.
        * Increment this in App.ts for every new release with a changed schema
        * This allows the installed application database to be upgraded. */
        schemaVersion: number;

        async initialize(structure: Array<IDatabaseTable>): Promise<void> {
            var provider = new MSharp.IndexedDbProvider();
            provider.schemaVersion = this.schemaVersion;
            provider.dbStructure = this.structure = structure;

            this.db = await provider.open();
        }

        getTable<T>(table: string): MSharp.DatabaseTable<T> {
            var info = this.structure.find(t => t.tableName == table);
            return new MSharp.DatabaseTable<Domain.Campaign>(this, info);
        }
    }
}