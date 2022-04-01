package com.concesionario.app.repository;

import com.concesionario.app.domain.Venta;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Venta entity.
 */
@Repository
public interface VentaRepository extends JpaRepository<Venta, Long> {
    default Optional<Venta> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Venta> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Venta> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct venta from Venta venta left join fetch venta.matricula_coche left join fetch venta.cliente left join fetch venta.trabajador",
        countQuery = "select count(distinct venta) from Venta venta"
    )
    Page<Venta> findAllWithToOneRelationships(Pageable pageable);

    @Query(
        "select distinct venta from Venta venta left join fetch venta.matricula_coche left join fetch venta.cliente left join fetch venta.trabajador"
    )
    List<Venta> findAllWithToOneRelationships();

    @Query(
        "select venta from Venta venta left join fetch venta.matricula_coche left join fetch venta.cliente left join fetch venta.trabajador where venta.id =:id"
    )
    Optional<Venta> findOneWithToOneRelationships(@Param("id") Long id);
}
