import CardContainer from "@/components/common/CardContainer";
import SectionHeader from "@/components/common/SectionHeader";
import AssignmentIcon from '@mui/icons-material/Assignment';
import SearchInput from "@/components/common/SearchInput";
import { useState } from "react";

function AssignmentTeacherComponent(){
    const [search, setSearch] = useState('');


    return( <>
        <CardContainer 
            header={<SectionHeader
            title="Gestión de Asignaciones"
            icon={<AssignmentIcon sx={{ color: 'white', fontSize: 30 }} />}
            onCreate={() => setIsCreating(true)}
            tooltipText="Crear asignación"/>}
            search={<SearchInput value={search} 
            onChange={(e) => setSearch(e.target.value)} 
            label={'Buscar asignación'} />}
            >
            
        </CardContainer>
    </>)
}

export default AssignmentTeacherComponent;