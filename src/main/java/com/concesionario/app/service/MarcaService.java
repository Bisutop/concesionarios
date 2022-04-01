package com.concesionario.app.service;

import com.concesionario.app.domain.Marca;
import com.concesionario.app.repository.MarcaRepository;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Marca}.
 */
@Service
@Transactional
public class MarcaService {

    private final Logger log = LoggerFactory.getLogger(MarcaService.class);

    private final MarcaRepository marcaRepository;

    public MarcaService(MarcaRepository marcaRepository) {
        this.marcaRepository = marcaRepository;
    }

    /**
     * Save a marca.
     *
     * @param marca the entity to save.
     * @return the persisted entity.
     */
    public Marca save(Marca marca) {
        log.debug("Request to save Marca : {}", marca);
        return marcaRepository.save(marca);
    }

    /**
     * Partially update a marca.
     *
     * @param marca the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<Marca> partialUpdate(Marca marca) {
        log.debug("Request to partially update Marca : {}", marca);

        return marcaRepository
            .findById(marca.getId())
            .map(existingMarca -> {
                if (marca.getMarca() != null) {
                    existingMarca.setMarca(marca.getMarca());
                }

                return existingMarca;
            })
            .map(marcaRepository::save);
    }

    /**
     * Get all the marcas.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Marca> findAll(Pageable pageable) {
        log.debug("Request to get all Marcas");
        return marcaRepository.findAll(pageable);
    }

    /**
     * Get one marca by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Marca> findOne(Long id) {
        log.debug("Request to get Marca : {}", id);
        return marcaRepository.findById(id);
    }

    /**
     * Delete the marca by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Marca : {}", id);
        marcaRepository.deleteById(id);
    }
}
