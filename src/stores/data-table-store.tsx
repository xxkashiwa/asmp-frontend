import { create } from 'zustand';
import {
    ColumnDef,
    ColumnFiltersState,
    PaginationState,
    SortingState,
    Table,
  } from '@tanstack/react-table';

interface TableState {
    sorting: SortingState;
    columnFilters: ColumnFiltersState;
    pageSize: number;
    pageIndex: number;
    pagination: PaginationState;
    currentSearchKey?: string;
    table: Table<any> | null;
    columns: ColumnDef<any, any>[];
    data: any[];
}

interface DataTableStore {
    tables: Record<string, TableState>;
    
    initTable: (tableId: string) => void;
    getTableState: (tableId: string) => TableState;
    setSorting: (tableId: string, updaterOrValue: SortingState | ((prev: SortingState) => SortingState)) => void;
    setColumnFilters: (tableId: string, updaterOrValue: ColumnFiltersState | ((prev: ColumnFiltersState) => ColumnFiltersState)) => void;
    setPagination: (tableId: string, updaterOrValue: PaginationState | ((prev: PaginationState) => PaginationState)) => void;
    setPageSize: (tableId: string, pageSize: number) => void;
    setPageIndex: (tableId: string, pageIndex: number) => void;
    setCurrentSearchKey: (tableId: string, currentSearchKey: string | undefined) => void;
    setTableData: (tableId: string, data: any[]) => void;
    setColumns: (tableId: string, columns: ColumnDef<any, any>[]) => void;
    setTable: (tableId: string, table: Table<any> | null) => void;
}

const defaultTableState: TableState = {
    sorting: [],
    columnFilters: [],
    pageSize: 10,
    pageIndex: 0,
    pagination: {
        pageIndex: 0,
        pageSize: 10,
    },
    currentSearchKey: undefined,
    table: null,
    columns: [],
    data: [],
};

const useDataTableStore = create<DataTableStore>((set, get) => ({
    tables: {},

    initTable: (tableId) => set((state) => ({
        tables: {
            ...state.tables,
            [tableId]: { ...defaultTableState }
        }
    })),

    getTableState: (tableId) => {
        const state = get();
        if (!state.tables[tableId]) {
            // 如果表格状态不存在，则初始化
            set((prevState) => ({
                tables: {
                    ...prevState.tables,
                    [tableId]: { ...defaultTableState }
                }
            }));
        }
        return state.tables[tableId] || { ...defaultTableState };
    },

    setSorting: (tableId, updaterOrValue) => set((state) => ({
        tables: {
            ...state.tables,
            [tableId]: {
                ...state.tables[tableId],
                sorting: typeof updaterOrValue === 'function' 
                    ? updaterOrValue(state.tables[tableId].sorting)
                    : updaterOrValue
            }
        }
    })),

    setColumnFilters: (tableId, updaterOrValue) => set((state) => ({
        tables: {
            ...state.tables,
            [tableId]: {
                ...state.tables[tableId],
                columnFilters: typeof updaterOrValue === 'function' 
                    ? updaterOrValue(state.tables[tableId].columnFilters)
                    : updaterOrValue
            }
        }
    })),

    setPageSize: (tableId, pageSize) => set((state) => ({
        tables: {
            ...state.tables,
            [tableId]: {
                ...state.tables[tableId],
                pageSize,
                pagination: { ...state.tables[tableId].pagination, pageSize }
            }
        }
    })),

    setPageIndex: (tableId, pageIndex) => set((state) => ({
        tables: {
            ...state.tables,
            [tableId]: {
                ...state.tables[tableId],
                pageIndex,
                pagination: { ...state.tables[tableId].pagination, pageIndex }
            }
        }
    })),

    setPagination: (tableId, updaterOrValue) => set((state) => ({
        tables: {
            ...state.tables,
            [tableId]: {
                ...state.tables[tableId],
                pagination: typeof updaterOrValue === 'function' 
                    ? updaterOrValue(state.tables[tableId].pagination)
                    : updaterOrValue
            }
        }
    })),

    setCurrentSearchKey: (tableId, currentSearchKey) => set((state) => ({
        tables: {
            ...state.tables,
            [tableId]: {
                ...state.tables[tableId],
                currentSearchKey
            }
        }
    })),

    setTableData: (tableId, data) => set((state) => ({
        tables: {
            ...state.tables,
            [tableId]: {
                ...state.tables[tableId],
                data
            }
        }
    })),

    setColumns: (tableId, columns) => set((state) => ({
        tables: {
            ...state.tables,
            [tableId]: {
                ...state.tables[tableId],
                columns
            }
        }
    })),

    setTable: (tableId, table) => set((state) => ({
        tables: {
            ...state.tables,
            [tableId]: {
                ...state.tables[tableId],
                table
            }
        }
    })),
}));

export default useDataTableStore;