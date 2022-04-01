package com.concesionario.app.repository;

import com.concesionario.app.domain.Coche;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Coche entity.
 */
@Repository
public interface CocheRepository extends JpaRepository<Coche, Long> {
    default Optional<Coche> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Coche> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Coche> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct coche from Coche coche left join fetch coche.modelo",
        countQuery = "select count(distinct coche) from Coche coche"
    )
    Page<Coche> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct coche from Coche coche left join fetch coche.modelo")
    List<Coche> findAllWithToOneRelationships();

    @Query("select coche from Coche coche left join fetch coche.modelo where coche.id =:id")
    Optional<Coche> findOneWithToOneRelationships(@Param("id") Long id);
}
