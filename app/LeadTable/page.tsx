"use client"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState, AppDispatch } from "../../lib/store"
import {
    fetchLeads,
    setSearchQuery,
    setSortOrder,
    setSortField,
} from "../../lib/features/leadsSlice"
import styles from './page.module.css'
import { Lead } from "../../lib/features/leadsSlice"

const LeadTable: React.FC = () => {
    const dispatch: AppDispatch = useDispatch()
    const { leads, searchQuery, sortOrder, sortField, loading, error } = useSelector(
        (state: RootState) => state.leads
    )

    useEffect(() => {
        dispatch(fetchLeads())
    }, [dispatch])

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchQuery(e.target.value))
    }

    const handleSortChange = (field: keyof Lead) => {
        const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
        dispatch(setSortField(field));
        dispatch(setSortOrder(newSortOrder));
    };

    const filteredLeads = leads
        .filter(
            (lead) =>
                lead.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => {
            if (sortField) {
                const comparison = a[sortField].localeCompare(b[sortField]);
                return sortOrder === "asc" ? comparison : -comparison;
            }
            return 0;
        })

    const getSortIndicator = (field: keyof Lead) => {
        if (sortField === field) {
            return sortOrder === "asc" ? "▲" : "▼";
        }
        return "--";
    }

    return (
        <div className={styles.container}>
            <div className={styles.green_circle}></div>
            <div className={styles.menu_bar}>
                <h1>ALMA</h1>
                <p>Leads</p>
                <p>Setting</p>
            </div>

            <div className={styles.table_container}>
                <h3 className={styles.table_title}>Leads</h3>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className={styles.search_input}
                />

                <div className={styles.table_box}>
                    <table>
                        <thead>
                            <tr>
                                <th onClick={() => handleSortChange("name")}>
                                    Name {getSortIndicator("name")}
                                </th>
                                <th onClick={() => handleSortChange("created")}>
                                    Submitted {getSortIndicator("created")}
                                </th>
                                <th onClick={() => handleSortChange("status")}>
                                    Status {getSortIndicator("status")}
                                </th>
                                <th onClick={() => handleSortChange("citizenship")}>
                                    Country {getSortIndicator("citizenship")}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredLeads.map((lead, index) => (
                                <tr key={index}>
                                    <td>{lead.name}</td>
                                    <td>{lead.created}</td>
                                    <td>{lead.status}</td>
                                    <td>{lead.citizenship}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default LeadTable
