package com.concesionario.app.repository;

import com.concesionario.app.domain.Modelo;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Modelo entity.
 */
@Repository
public interface ModeloRepository extends JpaRepository<Modelo, Long> {
    default Optional<Modelo> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Modelo> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Modelo> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct modelo from Modelo modelo left join fetch modelo.marca",
        countQuery = "select count(distinct modelo) from Modelo modelo"
    )
    Page<Modelo> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct modelo from Modelo modelo left join fetch modelo.marca")
    List<Modelo> findAllWithToOneRelationships();

    @Query("select modelo from Modelo modelo left join fetch modelo.marca where modelo.id =:id")
    Optional<Modelo> findOneWithToOneRelationships(@Param("id") Long id);
}
